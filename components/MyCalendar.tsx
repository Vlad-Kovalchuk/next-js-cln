import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import React, { ReactFragment } from "react";
import { Skeleton } from "@material-ui/lab";
import TodayEvent from "./Modal";
import { IBody } from "../types/ITemplates";

interface IProps {
  user: IBody;
}

export interface IEvent {
  start: Date;
  end: Date;
  title: string;
}

export interface IState {
  events: IEvent[];
  flag: boolean;
}

interface IDates {
  start: Date;
  end: Date;
}

moment.locale("en_GB");

class MyCalendar extends React.Component<IProps, IState> {
  constructor(Props: IProps) {
    super(Props);

    this.state = { events: [], flag: false };
  }

  componentDidMount(): void {
    this.handleImport()
      .then(() => this.setState({ flag: true }))
      .catch((err) => {
        throw err;
      });
  }

  handleSelect = ({ start, end }: IDates): void => {
    const { events } = this.state;
    const dif: number = Math.abs(end - start);
    // if more than 1 day event
    if (dif > 86399999) end.setDate(end.getDate() + 1);
    const title = window.prompt("New Event title");
    if (title) {
      events.push({ start, end, title });
      this.setState({ events });
    }
  };

  handleSave = async (): Promise<void> => {
    const { events } = this.state;
    const body: IBody[] = [];
    if (events.length > 0) {
      events.forEach((element) => {
        body.push({
          title: element.title,
          start: element.start,
          end: element.end,
        });
      });
    }
    await fetch("/api/events", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
  };

  handleImport = async (): Promise<void> => {
    const { events } = this.state;
    await fetch("/api/events", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) =>
        data.itemsList.forEach((element) => {
          const start = new Date(element.start);
          const end = new Date(element.end);
          const { title } = element;
          events.push({ start, end, title });
          this.setState({ events });
        })
      );
  };

  handleDelete(pEvent: IEvent): void {
    const del = window.confirm(`${pEvent.title} event \n Want to delete ?`);
    if (del) {
      const { events } = this.state;
      this.setState(() => {
        events.forEach((element) => {
          if (element.title === pEvent.title)
            if (element.start.getTime() === pEvent.start.getTime())
              if (element.end.getTime() === pEvent.end.getTime()) {
                events.splice(events.indexOf(element), 1);
              }
        });
        return { events };
      });
    }
  }

  render(): ReactFragment {
    const localizer = momentLocalizer(moment);
    const { events } = this.state;
    const { flag } = this.state;

    return (
      <div className="App">
        {flag ? (
          <>
            <Calendar
              selectable
              localizer={localizer}
              events={events}
              defaultDate={new Date()}
              defaultView="month"
              style={{ height: "80vh" }}
              onSelectEvent={(event) => this.handleDelete(event)}
              onSelectSlot={this.handleSelect}
            />
            <TodayEvent events={events} />
          </>
        ) : (
          <Skeleton
            width="100%"
            height="80vh"
            variant="rect"
            animation="wave"
          />
        )}
        <button
          className="btn btn-success btn-lg btn-block"
          type="submit"
          onClick={this.handleSave}
        >
          Save
        </button>
      </div>
    );
  }
}

export default MyCalendar;

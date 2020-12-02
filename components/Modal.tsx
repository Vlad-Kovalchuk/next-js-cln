import React, { ReactFragment } from "react";
import moment from "moment";

interface IEvent {
  start: Date;
  end: Date;
  title: string;
}

interface IEventsProps {
  events: IEvent[];
}

interface IState {
  isOpen: boolean;
  events: IEvent[];
}

export default class TodayEvent extends React.Component<IEventsProps, IState> {
  constructor(props: IEventsProps) {
    super(props);
    this.state = {
      isOpen: false,
      events: props.events,
    };
  }

  componentDidUpdate(prevProps: Readonly<IEventsProps>): void {
    if (prevProps !== this.props) {
      const { events } = this.state;
      this.setState({ events });
    }
  }

  handleRender = (eventList: IEvent[]): ReactFragment => {
    const format = "MM-DD-YYYY";
    const today: string = moment().format(format);
    const todayEvents = eventList.filter((element) => {
      return (
        moment(element.start).format(format) <= today &&
        moment(element.end).format(format) >= today
      );
    });
    if (todayEvents.length < 1) return <p>No events for today</p>;
    return todayEvents.map((element) => (
      <li className="list-group-item" key={element.title}>
        {element.title}
      </li>
    ));

    // let today = Date.now()
    // const todayEvents = eventList.filter(element => {
    //   return (element.start.getTime() <= today) && (element.end.getTime() >= today)
    // })
    // if (todayEvents.length < 1) return <p>No events for today</p>
    // return todayEvents.map(element => <li className={"list-group-item"} key={element._id}>{element.title}</li>)
  };

  render(): ReactFragment {
    const { events } = this.state;
    const { isOpen } = this.state;
    return (
      <>
        <button
          className="eventLogoContainer"
          type="button"
          style={{ outline: "none" }}
          onClick={() => this.setState({ isOpen: true })}
        >
          <img src="../dayEvents.png" alt="Click" />
        </button>
        {isOpen && (
          <div className="customModal" role="dialog">
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Today events</h5>
                  <button
                    type="button"
                    className="close"
                    data-dismiss="modal"
                    aria-label="Close"
                    onClick={() => this.setState({ isOpen: false })}
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  <ul className="list-group list-group-flush">
                    {this.handleRender(events)}
                  </ul>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-success"
                    data-dismiss="modal"
                    onClick={() => this.setState({ isOpen: false })}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </>
    );
  }
}

import { appointmentBlock } from "./AppointmentBlock.module.css";
import { UnfoldPlainButton } from "../DefaulButton/DefaultButton";

export default function AppointmentBlock({ treatment, date }) {
  // const dateString = `${date.month} ${date.day}`;

  return (
    <>
      <div className={appointmentBlock}>
        <h3>{treatment}</h3>
        <p>{date}</p>
        <UnfoldPlainButton>unfold</UnfoldPlainButton>
      </div>
    </>
  );
}

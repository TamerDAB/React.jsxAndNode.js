

import classes from './popup.module.css'

export default function Popup(props) {
  return (
    <section className={props.styling + ' ' + classes.section}>
      <button className={classes.x} onClick={props.closeFun}>&#x2716;</button>
      <p>Lorem ipsum dolor sit amet.</p>
      <p>Lorem ipsum dolor sit amet.</p>
      <p>Lorem ipsum dolor sit amet.</p>
    </section>
  )
}

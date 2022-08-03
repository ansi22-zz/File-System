import { useDispatch } from "react-redux";
import MenuBar from "../../components/MenuBar/MenuBar";
import { setInfo } from "../../store/Actions";
import "./HamBurger.css";
function HamBurger() {
  const dispatch = useDispatch();
  return (
    <>
      <div className="hamburger">
        <MenuBar />
        <div
          className="close"
          onClick={() => dispatch(setInfo({ active: false }))}
        >
          X
        </div>
      </div>
    </>
  );
}

export default HamBurger;

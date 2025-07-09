import ItemCard from "../ItemCard/ItemCard";
import "./ClothesSection.css";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function ClothesSection({ clothingItems, onCardClick, onAddClick }) {
  const currentUser = useContext(CurrentUserContext);

  // Filter items to only those owned by the current user
  const userItems = clothingItems.filter(
    (item) => item.owner === currentUser?._id
  );

  return (
    <>
      <div className="clothes-section__container">
        <p className="clothes-section__text">Your items</p>
        <button onClick={onAddClick} className="clothes-section__add-btn">
          + Add new
        </button>
      </div>
      <ul className="clothes-section__list">
        {userItems.map((item) => (
          <ItemCard key={item._id} item={item} onCardClick={onCardClick} />
        ))}
      </ul>
    </>
  );
}

export default ClothesSection;

import ItemCard from "../ItemCard/ItemCard";
import "./ClothesSection.css";

function ClothesSection({ clothingItems, onCardClick, onAddClick }) {
  return (
    <>
      <div className="clothes-section__container">
        <p className="clothes-section__text">Your items</p>
        <button onClick={onAddClick} className="clothes-section__add-btn">
          + Add new
        </button>
      </div>
      <ul className="clothes-section__list">
        {clothingItems.map((item) => (
          <ItemCard key={item._id} item={item} onCardClick={onCardClick} />
        ))}
      </ul>
    </>
  );
}

export default ClothesSection;

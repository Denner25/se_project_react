import ItemCard from "../ItemCard/ItemCard";

function ClothesSection({ clothingItems, onCardClick }) {
  return (
    <div className="clothes-section__items">
      <div>
        <p>Your items</p>
        <button>+ Add new</button>
        <ul className="cards__list">
          {clothingItems.map((item) => (
            <ItemCard key={item._id} item={item} onCardClick={onCardClick} />
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ClothesSection;

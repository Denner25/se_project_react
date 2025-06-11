import { defaultClothingItems } from "../../utils/constants";
import ItemCard from "../ItemCard/ItemCard";

function ClothesSection({ onCardClick }) {
  return (
    <div className="clothes-section__items">
      <div>
        <p>Your items</p>
        <button>+ Add new</button>
        <ul className="cards__list">
          {defaultClothingItems.map((item) => (
            <ItemCard key={item._id} item={item} onCardClick={onCardClick} />
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ClothesSection;

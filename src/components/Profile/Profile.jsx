import ClothesSection from "../ClothesSection/ClothesSection";
import SideBar from "../SideBar/SideBar";
import "./Profile.css";

function Profile({
  currentUser,
  clothingItems,
  onCardClick,
  onAddClick,
  onEditProfile,
  onLogOut,
  onCardLike,
}) {
  if (!currentUser) {
    return <div className="spinner">Loading...</div>;
  }

  return (
    <div className="profile">
      <section className="profile__sidebar">
        <SideBar onEditProfile={onEditProfile} onLogOut={onLogOut} />
      </section>
      <section className="profile__clothing-items">
        <ClothesSection
          clothingItems={clothingItems}
          onCardClick={onCardClick}
          onAddClick={onAddClick}
          onCardLike={onCardLike}
        />
      </section>
    </div>
  );
}

export default Profile;

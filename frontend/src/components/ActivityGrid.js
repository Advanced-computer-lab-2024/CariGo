import Activity from "./Activity";

const ActivityGrid = ({ Activities }) => {
  return (
    <div className="card-container">
      {Activities.map((Activity) => (
        <Activity
          title={Activity.title}
          img={Activity.img}
          description={
            <p>
              {Activity.description}
             
            </p>
          }
          id={Activity.id}
          path="ClothesDonationPage"
        />
      ))}
    </div>
  );
};


export default ActivityGrid;

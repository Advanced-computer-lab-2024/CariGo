import Activity from "./Activity";

const activity_grid = ({ Activity }) => {
  return (
    <div className="card-container">
      {Activity.map((Activity) => (
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


export default activity_grid;

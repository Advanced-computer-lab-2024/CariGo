import ExperienceCard from "./ExperienceCard";

const ExperienceList = ({experiences}) => {
  return ( 
    <div>
      {experiences.map(experience => <h1>{experience}</h1>)}
    </div>
   );
}
 
export default ExperienceList;
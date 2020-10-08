import React from "react";
import ReactDOM from "react-dom";

const App: React.FC = () => {
  const courseName = "Half Stack application development";

  interface CoursePartBase {
    name: string;
    exerciseCount: number;
  }

  interface CoursePartWithDescription extends CoursePartBase {
    description: string;
  }

  interface CoursePartOne extends CoursePartWithDescription {
    name: "Fundamentals";
  }

  interface CoursePartTwo extends CoursePartBase {
    name: "Using props to pass data";
    groupProjectCount: number;
  }

  interface CoursePartThree extends CoursePartWithDescription {
    name: "Deeper type usage";
    exerciseSubmissionLink: string;
  }

  type CoursePart = CoursePartOne | CoursePartTwo | CoursePartThree;

  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is an awesome course part"
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      exerciseSubmissionLink: "https://fake-exercise-submit.made-up-url.dev"
    }
  ];


  const Header: React.FC<{ courseName: string }> = ({ courseName }) => {
    return <h1>{courseName}</h1>;
  };

  const Content: React.FC<{ courseParts: CoursePart[] }> = ({ courseParts }) => {
    return (
      <div>
        {
          courseParts.map(p => {
            return <p key={p.name}>{p.name} {p.exerciseCount}</p>
          })
        }
      </div>
    );
  };

  const Total: React.FC<{ courseParts: CoursePart[] }> = ({ courseParts }) => {
    return (
      <p>
        Number of exercises{" "}
        {courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}
      </p>
    );
  };

  return (
    <div>
      <Header courseName={courseName} />
      <Content courseParts={courseParts} />
      <Total courseParts={courseParts} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
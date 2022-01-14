import * as React from "react";
import * as ReactDOM from "react-dom";

class AppDemo extends React.Component
{
    render(){
        return (<p>This works!!</p>);
    }
}

ReactDOM.render(
    <AppDemo />,
    document.getElementById('output')
  );
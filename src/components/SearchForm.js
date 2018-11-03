import React from 'react';

let SearchForm  = (props) => {
    const { onSubmit } = props;
    let cityInput,daysInput;
    return (
        <form onSubmit={(e)=>{
            e.preventDefault();
            onSubmit({city:cityInput.value,days:daysInput.value});
        }}>
          <div>
              <label >
                  <span>City: </span>
                  <input
                      ref={(node)=>cityInput=node}
                      name="city"
                      type="text"
                  />
              </label>
          </div>
          <div>
              <label>
                  <span>Days: </span>
                  <input
                      ref={(node)=>daysInput=node}
                      type="number"
                      name="days"
                  />
              </label>
          </div>
          <button type="submit">Search</button>
        </form>
    )
};
export default SearchForm;
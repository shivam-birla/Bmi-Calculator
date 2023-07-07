import React, { useState } from "react";
import './Bmi.css'

const Bmi = (props) => {
    const [changeValues, setChangeValues] = useState({})
    const [Color, setColor] = useState('')

    const handleInput = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        setChangeValues({ ...changeValues, [name]: value })
    }

    const submitFunction = (event) => {
        event.preventDefault();
        const updated = { ...changeValues };
        props.BMIvalues(updated);

        const bmi = updated.weight / ((updated.height / 100) ** 2);

        if (bmi < 25) {
            setColor('blue');
        } else if (bmi >= 25 && bmi < 30) {
            setColor('green');
        } else if (bmi >= 30 && bmi < 40) {
            setColor('orange');
        } else if (bmi >= 40) {
            setColor('red');
        }
    };
    const handleReset = () => {
        setChangeValues(changeValues.height)
        setChangeValues(changeValues.weight)
    }

    return (
        <div className="main">
            <h1 style={{ border: '3px dotted white', color: 'cyan', backgroundColor: 'chocolate', borderRadius: '15px', fontFamily: 'cursive', padding: '20px', marginBottom: '10px' }}>Calculate your Body Mass Index </h1>
            <form action="" onSubmit={submitFunction}>
                <div className="formmain">
                    <label htmlFor="height">
                        <div className="height">
                            <h3>Height (CM)</h3>
                            <input type="number" min="0" max="210" maxLength="3" pattern="\d{1,3}" placeholder="Enter your height in cm" value={changeValues.height || ''} onChange={handleInput} id="height" name="height" />
                        </div>
                    </label>
                    <label htmlFor="weight">
                        <div className="weight">
                            <h3>Weight (KG) </h3>
                            <input type="number" min="0" max="300" maxLength="3" pattern="\d{1,3}" placeholder="Enter your weight in kg" value={changeValues.weight || ''} onChange={handleInput} id="weight" name="weight" />
                        </div>
                    </label>
                    <div className="btn-class">
                        <input type="reset" onClick={handleReset} />
                        <input type="submit" id="button" />
                    </div>
                </div>
            </form>
            {props.bmi !== null && !isNaN(props.bmi) && (<p className="finalBmi" style={{ color: Color }}>Your BMI is {Math.floor(props.bmi)}</p>)}
            <img src="https://austingynecomastiacenter.com/assets/img/blog/BMI-Chart-Simple.png" width='300px' alt="" />
        </div>
    )
}

const DisplayBMI = () => {
    const [BmiData, setBmiData] = useState({})

    const takeBmiValues = (dataHere) => {
        setBmiData(dataHere)
    }

    const bmi = BmiData.weight && BmiData.height ? BmiData.weight / ((BmiData.height / 100) ** 2) : null;

    return (
        <div className="BMI">
            <Bmi BMIvalues={takeBmiValues} bmi={bmi} />
        </div>
    )
}

export default DisplayBMI

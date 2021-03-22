import React, {Component} from 'react';
import './App.css';

class App extends Component {

    state = {
        gross: 0,
        pension: 0,
        pensionPercent: 9.76,
        annuity: 0,
        annuityPercent: 1.5,
        disease: 0,
        diseasePercent: 2.45,
        sumOfZUS: 0,
        sumOfZUSPercent: 13.71,
        healthBasis: 0,
        health9Percent: 9,
        health9: 0,
        health7Percent: 7.75,
        health7: 0,
        taxBase: 0,
        taxPercent: 17,
        taxFree: 43.76,
        officeTax: 0,
        net: 0,
        kup: 250,
        kup250: 250,
        kup300: 300,
        dayOff: "no",
        sickness: "no",
        numberOfDaysOff: 0,
        leaveGross: 0,
        leaveSalary: 0,
        numberOfWorkHours: 0,
        numberOfHoursOff: 0,
        sick70: 0,
        sick70Percent: 70,
        sick80: 0,
        sick80Percent: 80,
        sick100: 0,
        sick100Percent: 100,
        sickGross: 0,
        sickSalary: 0,
        workPart: 0,
        sickBen70: 0,
        sickBen80: 0,
        sickBen100: 0,
        sickBenSalary: 0,


    };


    handleKup = (e) => {
        const value = e.target.value;
        this.setState({
            kup: value
        })
    };

    handleDayOff = e => {
        const value = e.target.value;
        this.setState({
            dayOff: value,
        })
    };
    handleSickness = e => {
        const value = e.target.value;
        this.setState({
            sickness: value,
        })
    };

    handleChange = (e) => {
        const value = e.target.value;
        const name = e.target.name;
        this.setState({
            [name]: value
        })
    }

    handleSubmit = (e)=> {
        e.preventDefault();
        const {gross, pensionPercent, annuityPercent, diseasePercent, health9Percent, health7Percent, kup, taxPercent, taxFree,
            sickGross, sumOfZUSPercent, sick80Percent, sick80, sick100Percent, sick100, sick70, sick70Percent, sickness,
            sickBen70, sickBen80, sickBen100,   leaveGross, numberOfWorkHours, numberOfHoursOff, dayOff} = this.state;

        let pensionVal = 0;
        let annuityVal = 0;
        let diseaseVal = 0;
        let healthBasisVal = 0;
        let sumOfZUSVal = 0;
        let health9Val = 0;
        let health7Val = 0;
        let taxBaseVal = 0;
        let officeTaxVal = 0;
        let netVal= 0;
        let sickSalaryVal = 0;
        let workPartVal = 0;
        let sickBenSalaryVal = 0;
        let leaveSalaryVal = 0;
        let basisGross = gross;
        if (sickness === "no"){
            if (dayOff === "yes"){
                let oneHoursLeave = (Number(leaveGross)/Number(numberOfWorkHours)).toFixed(2);
                leaveSalaryVal = oneHoursLeave*Number(numberOfHoursOff);
                basisGross = Number(gross) + leaveSalaryVal ;
            }
            pensionVal = (basisGross*pensionPercent/100).toFixed(2);
            annuityVal = (basisGross*annuityPercent/100).toFixed(2);
            diseaseVal = (basisGross*diseasePercent/100).toFixed(2);
            healthBasisVal = (basisGross - pensionVal - annuityVal - diseaseVal).toFixed(2);
            sumOfZUSVal = Number(pensionVal) + Number(annuityVal) + Number(diseaseVal);
            health9Val = (healthBasisVal*health9Percent/100).toFixed(2);
            health7Val = (healthBasisVal*health7Percent/100).toFixed(2);
            taxBaseVal = Math.round(basisGross-sumOfZUSVal-kup);
            officeTaxVal = Math.round(taxBaseVal*taxPercent/100-taxFree-health7Val);
            netVal = (basisGross-sumOfZUSVal-health9Val-officeTaxVal).toFixed(2);
        } else {
            const sickBasis = sickGross - (sickGross*sumOfZUSPercent/100);
            const oneDaySick = (sickBasis/30).toFixed(2);
            const sick70Salary = (oneDaySick*sick70Percent/100).toFixed(2);
            const sick80Salary = (oneDaySick*sick80Percent/100).toFixed(2);
            const sick100Salary = (oneDaySick*sick100Percent/100).toFixed(2);
            sickSalaryVal = sick70Salary*sick70 + sick80Salary*sick80 + sick100Salary*sick100;
            sickBenSalaryVal = sick70Salary*sickBen70 + sick80Salary*sickBen80 + sick100Salary*sickBen100;
            const oneDayWorkPart = (gross/30).toFixed(2);
            const sumDaysOfSick = Number(sick70)+Number(sick80)+Number(sick100)+Number(sickBen70)+Number(sickBen80)+Number(sickBen100);
            workPartVal = gross - oneDayWorkPart*sumDaysOfSick;
            pensionVal = (workPartVal*pensionPercent/100).toFixed(2);
            annuityVal = (workPartVal*annuityPercent/100).toFixed(2);
            diseaseVal = (workPartVal*diseasePercent/100).toFixed(2);
            healthBasisVal = (workPartVal - pensionVal - annuityVal - diseaseVal + sickSalaryVal).toFixed(2);
            sumOfZUSVal = Number(pensionVal) + Number(annuityVal) + Number(diseaseVal);
            health9Val = (healthBasisVal*health9Percent/100).toFixed(2);
            health7Val = (healthBasisVal*health7Percent/100).toFixed(2);
            taxBaseVal = Math.round(healthBasisVal-kup+sickBenSalaryVal);
            officeTaxVal = Math.round(taxBaseVal*taxPercent/100-taxFree-health7Val);
            netVal = (Number(healthBasisVal) + Number(sickBenSalaryVal)- Number(health9Val)-officeTaxVal).toFixed(2);

        }

        this.setState({
            pension: pensionVal,
            annuity: annuityVal,
            disease: diseaseVal,
            healthBasis: healthBasisVal,
            sumOfZUS: sumOfZUSVal.toFixed(2),
            health7: health7Val,
            health9: health9Val,
            taxBase: taxBaseVal,
            officeTax: officeTaxVal,
            net: netVal,
            sickSalary: sickSalaryVal.toFixed(2),
            workPart: workPartVal.toFixed(2),
            sickBenSalary: sickBenSalaryVal.toFixed(2),
            leaveSalary: leaveSalaryVal,
        })
    };
    render() {
        const {gross, pension, annuity, disease, kup250, kup300,
            healthBasis, sumOfZUS, health7, health9, taxBase,
            officeTax, net, dayOff, sickness, leaveGross, sick70,
            sick80, sick100, sickGross, leaveSalary,sickSalary, workPart, sickBen70, sickBen80, sickBen100,
            sickBenSalary, numberOfWorkHours, numberOfHoursOff} = this.state;
        return (
            <div>
                <p>Kalkulator wynagrodzeń umowa o pracę</p>
                <form onSubmit={this.handleSubmit}>
                    <label> <span>Miesięczna kwota brutto w zł:</span>
                        <input type="number" value={gross} name={"gross"} onChange={this.handleChange}/>
                    </label>
                    <br/>
                    <label> <span>Urlop</span>
                        <br/>
                        <input type={"radio"} value={"no"} name={"day_off"} onChange={this.handleDayOff}/>nie
                        <input type={"radio"} value={"yes"} name={"day_off"} onChange={this.handleDayOff}/>tak
                    </label>
                    <br/>
                    {
                        dayOff === "yes" &&
                            <div>
                                <label> <span style={{color: "red"}}>Podaj sumę zmiennych składników wynagrodzenia z ostatnich 3 lub 12 miesięcy</span>
                                    <input type="number" value={leaveGross} name={"leaveGross"} onChange={this.handleChange}/>
                                </label>
                                <br/>
                                <label> <span style={{color: "red"}}>Podaj ilość godzin przepracowanych w ciągu ostatnich 3 lub 12 miesięcy</span>
                                    <input type="number" value={numberOfWorkHours} name={"numberOfWorkHours"} onChange={this.handleChange}/>
                                </label>
                                <br/>
                                <label> <span style={{color: "red"}}>Podaj ilość godzin urlopu</span>
                                    <input type="number"  value={numberOfHoursOff} name={"numberOfHoursOff"}
                                    onChange={this.handleChange}/>
                                </label>
                                <p>Wynagrodzenie urlopowe ze składników zmiennych: <span>{leaveSalary}</span></p>
                            </div>
                    }
                    <br/>
                    <label> <span>Choroba</span>
                        <br/>
                        <input type={"radio"} value={"no"} name={"sickness"} onChange={this.handleSickness}/>nie
                        <input type={"radio"} value={"yes"} name={"sickness"} onChange={this.handleSickness}/>tak
                    </label>
                    <br/>
                    {
                        sickness === "yes" &&
                            <div>
                                <ol>Wynagrodzenie chorobowe:
                                    <li>
                                        do 33 dni - pracownik do 50 roku życia
                                    </li>
                                    <li>
                                        do 14 dni - pracownik powyżej 50 roku życia
                                    </li>
                                </ol>
                                <ol>Zasiłek chorobowy:
                                    <li>
                                        od 34 dnia - pracownik do 50 roku życia
                                    </li>
                                    <li>
                                        od 15 dnia - pracownik powyżej 50 roku życia
                                    </li>
                                </ol>
                                <label> <span style={{color: "red"}}>Podaj podstawę wymiaru wynagrodzenia/zasiłku chorobowego (średnie wynagrodzenie brutto z ostatnich 12 miesięcy - 13,71%)</span>
                                    <input type="number" value={sickGross} name={"sickGross"}
                                           onChange={this.handleChange}/>
                                </label>
                                <br/>
                                <label>Choroba 70% -
                                    Wpisz ilość dni wynagrodzenia chorobowego <input type="number"  value={sick70} name={"sick70"}
                                    onChange={this.handleChange}/>
                                    Wpisz ilość dni zasiłku chorobowego <input type="number" value={sickBen70} name={"sickBen70"}
                                           onChange={this.handleChange}/>
                                </label>
                                <br/>
                                <label>Choroba 80% -
                                    Wpisz ilość dni wynagrodzenia chorobowego
                                    <input type="number"  value={sick80} name={"sick80"} onChange={this.handleChange}/>
                                    Wpisz ilość dni zasiłku chorobowego
                                    <input type="number"  value={sickBen80} name={"sickBen80"} onChange={this.handleChange}/>
                                </label>
                                <br/>
                                <label>Choroba 100% -
                                    Wpisz ilość dni wynagrodzenia chorobowego
                                    <input type="number" value={sick100} name={"sick100"} onChange={this.handleChange}/>
                                    Wpisz ilość dni zasiłku chorobowego
                                    <input type="number"  value={sickBen100} name={"sicBen100"} onChange={this.handleChange}/>
                                </label>
                                <br/>
                                <p>Wynagrodzenie chorobowe brutto: <span>{sickSalary}</span></p>
                                <p>Zasiłek chorobowy brutto: <span>{sickBenSalary}</span></p>
                                <p>Wynagrodzenie brutto za przepracowaną część miesiąca w przypadku choroby: <span>{workPart}</span></p>
                            </div>
                    }
                    <br/>
                    <label>Koszty uzyskania przychodu (KUP):
                        <br/>
                        <input type="radio" value={kup250} name={"option"}
                               onChange={this.handleKup}
                        />
                               250 zł - praca w miejscu zamieszkania
                        <br/>
                        <input type="radio" value={kup300} name={"option"}
                               onChange={this.handleKup}
                        />300 zł - praca poza miejscem zamieszkania
                    </label>
                    <br/>
                    <p> Składka emerytalna (9,76% * kwota brutto): <span>{pension}</span></p>
                    <p> Składka rentowa (1,5% * kwota brutto): <span>{annuity}</span></p>
                    <p> Składka chorobowa (2,45% * kwota brutto): <span>{disease}</span></p>
                    <p> Suma składek ZUS (13,71%): <span>{sumOfZUS}</span></p>
                    <p> Podstawa składki zdrowotnej (kwota brutto - składki ZUS): <span>{healthBasis}</span></p>
                    <p> Składka zdrowotna (9%): <span>{health9}</span></p>
                    <p> Składka zdrowotna (7,75%): <span>{health7}</span></p>
                    <p> Podstawa opodatkowania (brutto - ZUS - KUP): <span>{taxBase}</span></p>
                    <p> Zaliczka na podatek dochodowy do US (podstawa * 17% - kwota wolna (43,76 zł) - skł. zdr. 7,75%): <span>{officeTax}</span></p>
                    <p> <span>Do wypłaty - netto (brutto - ZUS - skł. zdr. 9% - podatek): </span><span style={{color: "red"}}>{net}</span></p>
                    <button type={"submit"}>Oblicz</button>
                </form>
            </div>
        )
    }
}

export default App;

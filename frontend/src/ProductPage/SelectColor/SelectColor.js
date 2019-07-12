import React from 'react';
import './SelectColor.css';
import {makeStyles} from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import FilledInput from '@material-ui/core/FilledInput';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';


const options = [
    {value: 'yellow', label: 'Yellow'},
    {value: 'red', label: 'Red'},
    {value: 'green', label: 'Green'},
    {value: 'blue', label: 'Blue'},
];

class SelectColor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedColor: undefined,
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        this.setState({selectedColor: e.target.value});
    };

    render() {
        const {selectedColor} = this.state;

        return (
            <div>
                <FormControl style={{width:'100%'}} variant="outlined">
                    <InputLabel htmlFor="filled-age-simple">Цвет</InputLabel>
                    <Select
                        className={'select-color'}
                        value={selectedColor}
                        onChange={this.handleChange}
                        input={<OutlinedInput id="outlined-age-simple" />}
                    >
                        {options.map((e) => <MenuItem value={e.value}><span style={{color:e.value}}>{e.label}</span></MenuItem>)}
                    </Select>
                </FormControl>
            </div>
        );
    }
}

export default SelectColor;

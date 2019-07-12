import React from 'react';
import './SelectSize.css';
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";


const options = [
    {value: 'XS', label: 'XS'},
    {value: 'S', label: 'S'},
    {value: 'M', label: 'M'},
    {value: 'L', label: 'L'},
    {value: 'XL', label: 'XL'},
];

class SelectSize extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedSize: undefined,
        };
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(e){
        this.setState({selectedSize: e.target.value});
    };

    render() {
        const {selectedSize} = this.state;

        return (
            <FormControl style={{width:'100%'}} variant="outlined">
                <InputLabel htmlFor="filled-age-simple">Размер</InputLabel>
                <Select
                    className={'select-size'}
                    value={selectedSize}
                    onChange={this.handleChange}
                    input={<OutlinedInput id="outlined-age-simple" />}
                >
                    {options.map((e) => <MenuItem value={e.value} >{e.label}</MenuItem>)}
                </Select>
            </FormControl>
        );
    }
}

export default SelectSize;
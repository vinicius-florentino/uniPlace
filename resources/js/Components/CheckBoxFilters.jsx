import * as React from 'react';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import Button from "@mui/material/Button";
import Grid from '@mui/material/Grid';
import RemixIcon from "@/Components/RemixIcon";
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';

export default function CheckBoxFilters({ adsCategories, setData }) {

    const [personName, setPersonName] = React.useState([]);

    const handleChange = (event) => {
        const {
            target: { value },
        } = event;
        setPersonName(
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    const handleCheckBoxChange = (e) => {
        const { name, checked } = e.target;
        setData((prevData) => {
            let newFilters = { ...prevData.filters };
            if (checked) {
                newFilters.ads_categories = [...newFilters.ads_categories, name];
                const categoryName = adsCategories.find(category => category.id === parseInt(name))?.name || '';
                setPersonName(prevPersonName => [...prevPersonName, categoryName]);
            } else {
                newFilters.ads_categories = newFilters.ads_categories.filter(
                    (cat) => cat !== name
                );
                const categoryName = adsCategories.find(category => category.id === parseInt(name))?.name || '';
                setPersonName(prevPersonName => prevPersonName.filter(cat => cat !== categoryName));
            }
            return { ...prevData, filters: newFilters };
        });
    };

    return (
        <Box>
            <Accordion>
                <AccordionSummary
                    expandIcon={<RemixIcon className="ri-arrow-drop-down-line" />}
                    aria-controls="panel2-content"
                    id="panel2-header"
                >
                    <Box sx={{ display: 'flex', alignItems: 'center', pl: 2, gap: 1 }}>
                        <RemixIcon className="ri-filter-line" />
                        <Typography>Filtros</Typography>
                    </Box>
                </AccordionSummary>
                <AccordionDetails>
                    <Grid container spacing={2} sx={{ pl: 2, pb: 1 }}>
                        <FormControl sx={{ m: 1, width: 300 }}>
                            <InputLabel>Categorias</InputLabel>
                            <Select
                                multiple
                                value={personName}
                                onChange={handleChange}
                                input={<OutlinedInput label="Categorias" />}
                                renderValue={(selected) => selected.join(',')}
                            >
                                {adsCategories.map((category) => (
                                    <MenuItem key={category.id} value={category.id}>
                                        <Checkbox checked={personName.indexOf(category.id) > -1} />
                                        <ListItemText primary={category.name} />
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <Grid item xs={12}>
                            <Button
                                type='submit'
                                disableElevation
                                variant="contained"
                            >
                                Aplicar
                            </Button>
                        </Grid>
                    </Grid>
                </AccordionDetails>
            </Accordion>
        </Box>
    );
}

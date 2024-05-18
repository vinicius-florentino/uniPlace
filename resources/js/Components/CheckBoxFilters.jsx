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

export default function CheckBoxFilters({ adsCategories, setData }) {

    const handleCheckBoxChange = (e) => {
        const { name, checked } = e.target;
        setData((prevData) => {
            let newFilters = { ...prevData.filters };

            if (checked) {
                newFilters.ads_categories = [...newFilters.ads_categories, name];
            } else {
                newFilters.ads_categories = newFilters.ads_categories.filter(
                    (cat) => cat !== name
                );
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
                        <Grid item xs={12}>
                            <Box sx={{ mb: 2 }}>
                                <Typography variant="h6">Categorias</Typography>
                            </Box>
                            <FormControl component="fieldset" variant="standard">
                                <FormGroup sx={{ flexDirection: "row"}}>
                                    {adsCategories.map((category) => (
                                        <FormControlLabel
                                            key={category.id}
                                            control={
                                                <Checkbox
                                                    onChange={handleCheckBoxChange}
                                                    name={category.id.toString()}
                                                />
                                            }
                                            label={category.name}
                                        />
                                    ))}
                                </FormGroup>
                            </FormControl>
                        </Grid>
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

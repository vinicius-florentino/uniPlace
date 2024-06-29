import React, { useState } from "react";
import NavigationLayout from "@/Layouts/NavigationLayout";
import { Head, useForm, router } from "@inertiajs/react";
import Loading from "@/Components/Loading";
import AdCard from "@/Components/cards/AdCard";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Pagination from "@mui/material/Pagination";
import SearchField from "@/Layouts/NavigationLayout/Components/SearchField";
import Alert from "@mui/material/Alert";
import FormControl from "@mui/material/FormControl";
import Checkbox from "@mui/material/Checkbox";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionActions from "@mui/material/AccordionActions";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import RemixIcon from "@/Components/RemixIcon";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import ListItemText from "@mui/material/ListItemText";

export default function Ads({ ads, auth, adsCategories }) {
    
    let paginationTotal = ads?.last_page;
    let actualPage = ads?.current_page;
    const searchParams = new URLSearchParams(window.location.search);
    const [loading, setLoading] = useState(false);

    const defaultSearch = "";

    const defaultFilters = {
        ads_categories: [],
    };

    const filters = {};
    searchParams.forEach((value, key) => {
        if (key.startsWith("filters")) {
            const filterKey = key.split("[")[1].split("]")[0];
            if (!filters[filterKey]) {
                filters[filterKey] = [];
            }
            filters[filterKey].push(parseInt(value));
        }
    });

    const initialFilters =
        Object.keys(filters).length > 0 ? filters : defaultFilters;

    const { data, setData, get, processing } = useForm({
        search: searchParams.get("search") || defaultSearch,
        filters: initialFilters,
    });

    const [expanded, setExpanded] = useState(data.filters !== defaultFilters);

    const handleRemoveFilters = () => {
        setData("filters", defaultFilters);
    };

    const handleAccordionChange = (e, expanded) => {
        setExpanded(expanded);
    };

    const handleFiltersChange = (e) => {
        const { name, value } = e.target;
        setData((prevData) => {
            let newFilters = { ...prevData.filters };
            newFilters[name] = value;
            return { ...prevData, filters: newFilters };
        });
    };

    const handleSearchChange = (e) => {
        const { value } = e.target;
        setData("search", value);
    };

    const handlePaginationChange = (e, page) => {
        setLoading(true);
        router.visit("/ads", {
            data: { page, search: data.search, filters: data.filters },
            onFinish: () => setLoading(false),
        });
    };

    const onSubmit = (e) => {
        e.preventDefault();
        get("/ads", {
            data,
            onFinish: () => setLoading(false),
            preserveScroll: true,
        });
    };

    return (
        <NavigationLayout user={auth.user}>
            <Head title="Anúncios" />

            <Box component="form" onSubmit={onSubmit} noValidate>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <SearchField
                            onSubmit={onSubmit}
                            value={data.search}
                            onChange={handleSearchChange}
                            disabled={processing}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Accordion
                            sx={{ px: 2, py: 1 }}
                            expanded={expanded}
                            onChange={handleAccordionChange}
                        >
                            <AccordionSummary
                                expandIcon={
                                    <RemixIcon className="ri-arrow-down-s-line" />
                                }
                                aria-controls="panel2-content"
                                id="panel2-header"
                            >
                                <Box sx={{ width: "100%" }}>
                                    <Typography
                                        sx={{
                                            fontWeight: 500,
                                            fontSize: 16,
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "start",
                                            gap: "8px",
                                        }}
                                    >
                                        <RemixIcon className="ri-filter-3-line" />
                                        Filtros
                                    </Typography>
                                </Box>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} md={6}>
                                        <FormControl fullWidth>
                                            <InputLabel id="demo-multiple-name-label">
                                                Categorias
                                            </InputLabel>
                                            <Select
                                                labelId="demo-multiple-name-label"
                                                id="demo-multiple-name"
                                                multiple
                                                value={
                                                    data.filters.ads_categories
                                                }
                                                name="ads_categories"
                                                onChange={handleFiltersChange}
                                                input={
                                                    <OutlinedInput label="Categorias" />
                                                }
                                                renderValue={(selected) =>
                                                    selected
                                                        .map(
                                                            (categoryId) =>
                                                                adsCategories.find(
                                                                    (
                                                                        category
                                                                    ) =>
                                                                        category.id ===
                                                                        categoryId
                                                                )?.name || ""
                                                        )
                                                        .join(", ")
                                                }
                                            >
                                                {adsCategories.map(
                                                    (category, index) => (
                                                        <MenuItem
                                                            key={index}
                                                            value={category.id}
                                                        >
                                                            <Checkbox
                                                                checked={
                                                                    data.filters.ads_categories.indexOf(
                                                                        category.id
                                                                    ) > -1
                                                                }
                                                            />
                                                            <ListItemText
                                                                primary={
                                                                    category.name
                                                                }
                                                            />
                                                        </MenuItem>
                                                    )
                                                )}
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                </Grid>
                            </AccordionDetails>
                            <AccordionActions>
                                <Button
                                    disableElevation
                                    variant="containedLight"
                                    onClick={() => handleRemoveFilters()}
                                >
                                    Remover filtros
                                </Button>
                                <Button
                                    type="submit"
                                    disableElevation
                                    variant="contained"
                                >
                                    Aplicar
                                </Button>
                            </AccordionActions>
                        </Accordion>
                    </Grid>
                </Grid>
            </Box>
            {!loading && (
                <>
                    <Box sx={{ my: 2 }}>
                        <Grid container spacing={2} rowSpacing={0}>
                            {ads.data.map((ad, index) => (
                                <Grid
                                    key={index}
                                    item
                                    xs={6}
                                    sm={4}
                                    md={3}
                                    lg={2}
                                    sx={{
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                    }}
                                >
                                    <AdCard
                                        sellerName={ad?.seller?.name}
                                        price={ad.price}
                                        title={ad.title}
                                        to={`/ad/${ad.id}`}
                                        imageSrc={ad.image_url}
                                        promotedUntil={ad?.up_usage?.expires_at}
                                    />
                                </Grid>
                            ))}
                        </Grid>
                    </Box>
                    {ads.data.length === 0 && (
                        <Box sx={{ width: "100%" }}>
                            <Alert severity="info">
                                Nenhum anúncio foi encontrado
                            </Alert>
                        </Box>
                    )}
                    {ads.data.length >= 1 && (
                        <Box>
                            <Pagination
                                color="primary"
                                page={actualPage}
                                count={paginationTotal}
                                onChange={handlePaginationChange}
                                sx={{
                                    display: "flex",
                                    justifyContent: "center",
                                }}
                            />
                        </Box>
                    )}
                </>
            )}
            {loading && <Loading />}
        </NavigationLayout>
    );
}

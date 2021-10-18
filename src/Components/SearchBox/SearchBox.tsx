/**
 * this components is a card contains an autocomplete
 * asyn search input which searches in city names and
 * returns the selected city name (string)
 */
import { Card, Grid } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";
import TextField from "@mui/material/TextField";
import React, { Fragment, useEffect, useState } from "react";
import { searchCities } from "./API";

interface IProps {
  defaultValue: string | null;
  onSelected: (value: string) => void;
}

const SearchBox: React.FC<IProps> = ({ onSelected, defaultValue }) => {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // load cities list for the first time
  useEffect(() => {
    if (!loading) {
      return;
    }
    (async () => {
      const results = await searchCities(
        defaultValue === null ? "london" : defaultValue // if there is a default city, search it, otherwise: search london
      );
      setOptions(results.map((record) => record.name));
      setLoading(false);
    })();
  }, []);

  useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);
  return (
    <Card style={{ padding: 10, width: "100%" }}>
      <Grid container>
        <Grid item md={12}>
          <Autocomplete
            open={open}
            onOpen={() => {
              setOpen(true);
            }}
            onClose={() => {
              setOpen(false);
            }}
            isOptionEqualToValue={(option: string, value) =>
              option.toLowerCase() === value.toLowerCase()
            }
            getOptionLabel={(option: string) => option}
            options={options}
            loading={loading}
            defaultValue={defaultValue === null ? "london" : defaultValue} // default city or london
            onChange={(_, value) => {
              if (!!value) {
                onSelected(value);
                location.hash = value;
              }
            }}
            renderInput={(params) => {
              return (
                <TextField
                  {...params}
                  label="Search City or Country"
                  onChange={async (event) => {
                    const term = event.target.value;
                    if (term.length < 2) return;
                    setLoading(true);
                    const results = await searchCities(term);
                    setOptions(results.map((record) => record.name));
                    setLoading(false);
                  }}
                  InputProps={{
                    ...params.InputProps,
                    endAdornment: (
                      <Fragment>
                        {loading ? (
                          <CircularProgress color="inherit" size={20} />
                        ) : null}
                        {params.InputProps.endAdornment}
                      </Fragment>
                    ),
                  }}
                />
              );
            }}
          />
        </Grid>
      </Grid>
    </Card>
  );
};
export default SearchBox;

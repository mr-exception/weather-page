import { Card, Grid } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";
import TextField from "@mui/material/TextField";
import react, { Fragment, useEffect, useState } from "react";
import { searchCities } from "./API";

interface IProps {
  onSelected: (value: string) => void;
  defaultValue: string;
}

const SearchBox: React.FC<IProps> = ({ onSelected, defaultValue }) => {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!loading) {
      return;
    }
    (async () => {
      const results = await searchCities(defaultValue);
      setOptions(results.map((record) => record.name));
      setLoading(false);
    })();
  }, [loading]);

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
            isOptionEqualToValue={(option: string, value) => option === value}
            getOptionLabel={(option: string) => option}
            options={options}
            loading={loading}
            defaultValue={defaultValue}
            onChange={(_, value) => {
              if (!!value) onSelected(value);
            }}
            renderInput={(params) => {
              return (
                <TextField
                  {...params}
                  label="Search City or Country"
                  onChange={async (event) => {
                    const term = event.target.value;
                    setLoading(true);
                    const results = await searchCities(
                      !!term ? term : defaultValue
                    );
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

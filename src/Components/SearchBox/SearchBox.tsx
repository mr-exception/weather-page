import { Card, Grid } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";
import TextField from "@mui/material/TextField";
import react, { Fragment, useEffect, useState } from "react";
import { searchCities } from "./API";

interface IProps {
  onSelected: (value: string) => void;
}

const SearchBox: React.FC<IProps> = ({ onSelected }) => {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState<string[]>([]);
  // console.log(options);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!loading) {
      return;
    }
    (async () => {
      const results = await searchCities("london");
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
            defaultValue="london"
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
                    if (term.length < 2) return;
                    setLoading(true);
                    const results = await searchCities(term);
                    setOptions(results.map((record) => record.name));
                    console.log(options);
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

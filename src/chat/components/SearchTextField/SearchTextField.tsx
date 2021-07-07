import React, {useState} from "react";
import {TextField} from "@material-ui/core";

type Props = {
    queryChanged: (query: string) => void;
}

export const SearchTextField: React.FC<Props> = ({queryChanged}) => {
    const [query, setQuery] = useState('');
    const handleInputChange = (e: any) => {
        const content = e.target.value;
        setQuery(content);
        queryChanged(content);
    };

    return (
        <TextField
            label="Search"
            variant="outlined"
            fullWidth
            value={query}
            onChange={handleInputChange} />
    );
};

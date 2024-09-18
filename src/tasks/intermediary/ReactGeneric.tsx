import React from "react";
import { SingleSelect, SingleSelectOption, SingleSelectProps } from "@dhis2/ui";

/* TASK: refactor this component and types to preserve the full object in onChange */

type OwnProps = {
    selected: string | undefined;
    onChange: (select: DisplayableModel | undefined) => void;
    options: DisplayableModel[];
};

type DisplayableModel = {
    id: string;
    displayName: string;
};

type ModelSelectProps = Omit<SingleSelectProps, keyof OwnProps> & OwnProps;

export const ModelSelect = ({
    onChange,
    options,
    ...rest
}: ModelSelectProps) => {
    const selectOptions = options.map(({ id, displayName }) => (
        <SingleSelectOption value={id} label={displayName} key={id} />
    ));
    return (
        <SingleSelect
            {...rest}
            onChange={({ selected }, e) => {
                const option = options.find(({ id }) => id === selected);
                onChange(option);
            }}
        >
            {selectOptions}
        </SingleSelect>
    );
};

const defaultOptions = [
    { id: "1", displayName: "Model 1", access: { read: true, write: false } },
    { id: "2", displayName: "Model 2", access: { read: true, write: false } },
];
const ModelSelectWrapper = () => {
    return (
        <ModelSelect
            selected={undefined}
            // TODO: fix the type error
            onChange={(selected) => console.log({ access: selected.access })}
            options={defaultOptions}
        />
    );
};

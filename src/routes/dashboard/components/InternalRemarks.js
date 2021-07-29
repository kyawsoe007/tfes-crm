import React, { useEffect, useState, useRef, useMemo } from 'react';
import PropTypes from 'prop-types';

import FormInput from "Components/Form/FormInput";

function InternalRemarks({ value, handleChange, target, keys, onBlur, originalVal}) {

    const [originalValue, setOriginalValue] = useState("")

    useEffect(() => {
        setOriginalValue(originalVal)
    }, [])

    const memorizedRemark = useMemo(() => {
        return value
    }, [value])
    console.log("handleChange",handleChange)

    return (
        <FormInput
            target={target}
            keys={keys}
            value={memorizedRemark}
            handleChange={handleChange}
            onBlur={onBlur}
            originalVal={originalValue}
            isToggledEditForm={true}
        />
    )
}

export default InternalRemarks
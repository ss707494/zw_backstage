import React from "react";
import styled from "styled-components";
import {TextFieldProps} from "@material-ui/core";
import {CusTextField} from "@/component/CusTextField";

export const TextField: React.ComponentType<TextFieldProps> = styled(CusTextField)`
  &&& {
    margin-bottom: 0;
  }
  & .MuiInputLabel-root {
    background: #61dafb;
  }
`

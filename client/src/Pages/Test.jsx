import { useQuery } from "@apollo/client";
import { QUERY_GAMES } from "../utils/queries";
import { useState, useEffect } from "react";
import Library from "../components/Library";

const Test = () => {

  return (
    <div>
      <Library />
    </div>
  );
};

export default Test;

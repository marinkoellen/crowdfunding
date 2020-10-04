import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import PledgeForm from "../components/PledgeForm/PledgeForm";
import Loader from "../components/Loader/Loader";

function PledgePage() {
  const { id } = useParams();

  return <PledgeForm id={id} />;
}

export default PledgePage;

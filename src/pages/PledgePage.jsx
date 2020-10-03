import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import PledgeForm from "../components/PledgeForm/PledgeForm";

function PledgePage() {
  const { id } = useParams();

  return <PledgeForm id={id} />;
}

export default PledgePage;

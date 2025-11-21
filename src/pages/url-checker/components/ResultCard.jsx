import React from "react";

const ResultCard = ({ result }) => {
  if (!result) return null;

  return (
    <div className="mt-4 p-4 rounded-lg bg-muted border border-border">
      <h3 className="font-semibold text-lg mb-2">Result</h3>
      <p>Status: {result.safe ? "Safe ✅" : "Malicious ❌"}</p>
      {result.message && <p className="text-sm text-text-secondary">Message: {result.message}</p>}
    </div>
  );
};

export default ResultCard;

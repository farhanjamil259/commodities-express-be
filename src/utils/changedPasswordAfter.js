const changedPasswordAfter = (passwordChangedDate, jwtTokenIssueDate) => {
  if (passwordChangedDate && jwtTokenIssueDate) {
    // Convert date to seconds (timestamp)
    const passwordChangedTimestamp = parseInt(
      `${passwordChangedDate.getTime() / 1000}`,
      10
    );

    return jwtTokenIssueDate < passwordChangedTimestamp;
  }

  return false;
};

export default changedPasswordAfter;

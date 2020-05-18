const getTemplateIdParts = (ndaTemplateId) => {
  const [owner, repo, ref, ...path] = ndaTemplateId.split('/');

  return {
    owner,
    repo,
    ref,
    path: path.join('/'),
  };
};

export default getTemplateIdParts;

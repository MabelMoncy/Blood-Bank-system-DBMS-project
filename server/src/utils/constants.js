const BLOOD_GROUPS = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

const COMPATIBILITY_MAP = {
  'A+': ['A+', 'A-', 'O+', 'O-'],
  'A-': ['A-', 'O-'],
  'B+': ['B+', 'B-', 'O+', 'O-'],
  'B-': ['B-', 'O-'],
  'AB+': BLOOD_GROUPS,
  'AB-': ['AB-', 'A-', 'B-', 'O-'],
  'O+': ['O+', 'O-'],
  'O-': ['O-'],
};

const getCompatibleGroups = (bloodGroup, preferExact = false) => {
  if (preferExact) {
    return [bloodGroup];
  }
  return COMPATIBILITY_MAP[bloodGroup] || [];
};

module.exports = {
  BLOOD_GROUPS,
  COMPATIBILITY_MAP,
  getCompatibleGroups,
};

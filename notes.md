1. Dependency array is used in useEffect because it controls when the effect run again. So without [], it runs in every render and cause endless loop of reuest.
2. filteredUsers is not stored in state because we use normal variable for information that can be calculated from existing state.

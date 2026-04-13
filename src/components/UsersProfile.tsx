import { ProfileFeature } from "../features/profile";

/**
 * Re-exporting the modularized Profile Feature.
 * This component is now split into multiple specialized sub-components
 * located in src/features/profile.
 */
export const UsersProfile = () => {
    return <ProfileFeature />;
};

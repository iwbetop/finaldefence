import { signOut } from "@/auth";
import { Button } from "@/components/ui/button";

import { ProfileCard } from "@/components/cards/profile-card";
import { EducationCard } from "@/components/cards/education-card";
import { AchievementCard } from "@/components/cards/achievement-card";
import { ProjectCard } from "@/components/cards/project-card";
import { SkillCard } from "@/components/cards/skill-card";
export default function UserPage(){
    return(
        <div className="p-6 space-y-6">
            <ProfileCard />
            <SkillCard />
            <EducationCard />
            <AchievementCard />
            <ProjectCard />
        </div>
    );
}
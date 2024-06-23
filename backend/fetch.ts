import { prisma } from "@/backend/prisma";

export async function GetUserByID(id: string){
    try{
        const user = await prisma.user.findUnique({ where: { id }, include: { 
            course: true, achievement: true, project: true, preferences: true,
            education: true, contact: true, skill: true
         } });
        return user;
    }catch{
        return null
    }
}
export async function GetUserByEMAIL(email: string){
    const user = await prisma.user.findUnique({ where: { email }, include: {
        course: true, achievement: true, project: true, preferences: true,
        education: true, contact: true, skill: true
    } });
    return user;
}
export async function GetUsers(){
    const users = await prisma.user.findMany({
        where: { role: "USER" },
        include: { course: true, preferences: true }
    });
    return users;
}
export async function GetRecentUsers(limit = 10) {
    const recent = await prisma.user.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      where: { role: "USER" },
      take: limit,
      include: { course: true }
    });
    return recent;
}
export async function GetNumberOfUsers() {
    const count = await prisma.user.count({ where: { role: "USER" } });
    return count;
}

export async function GetCourses(){
    const courses = await prisma.course.findMany();
    return courses;
}

export async function GetEmailTokenByEMAIL(email: string){
    const emailToken = await prisma.emailToken.findFirst({ where: { email } });
    return emailToken;
}
export async function GetEmailTokenByTOKEN(token: string){
    const emailToken = await prisma.emailToken.findFirst({ where: { token } });
    return emailToken;
}
export async function GetPasswordTokenByEMAIL(email: string){
    const passwordResetToken = await prisma.passwordToken.findFirst({ where: { email } });
    return passwordResetToken;
}
export async function GetPasswordTokenByTOKEN(token: string){
    const passwordResetToken = await prisma.passwordToken.findFirst({ where: { token } });
    return passwordResetToken;
}

export async function GetSkills(){
    const skills = await prisma.skill.findMany();
    return skills;
}

export async function GetUserSkills(id: string){
    const skills = await prisma.userSkill.findMany({
        where: { userId: id },
        include: { skill: true }
    });
    return skills;
}

export async function GetFilteredUsers(
    idOrEmail: string | null,
    courseId: string | null,
    emailVerified: boolean,
    archieved: boolean,
    lock: boolean,
    alumni: boolean
){
    const whereClause: Record<string, any> = {};
    if(idOrEmail){
        idOrEmail = idOrEmail.replace("%", "@");
        if(idOrEmail.includes("@cdd.edu.ph")){
            whereClause.email = idOrEmail;
        }
        if(!idOrEmail.includes("@")){
            whereClause.schoolId = idOrEmail;
        }
    }
    if(courseId){
        whereClause.courseId = courseId;
    }
    const emailVerify = emailVerified ? true : false;
    whereClause.isEmailVerified = emailVerify;

    const archieve = archieved ? true : false;
    whereClause.isArchieved = archieve;

    const locked = lock ? true : false;
    whereClause.lock = locked;

    const isAlumni = alumni ? true : false;
    whereClause.isAlumni = isAlumni;

    console.log(whereClause)

    const users = await prisma.user.findMany({
        where: {
            AND: [
                {role: "USER"},
                whereClause
            ]
        },
        include: { course: true, preferences: true }
    });
    return users

}

export async function GetSkillsCategory(){
    const categories = await prisma.skill.findMany({
        distinct: [`category`],
        select: {
            category: true,
        }
    });
    return categories;
}

export async function GETALLUSERSBYADMIN(){
    const users = await prisma.user.findMany({
        select: {
            id: true,
            firstName: true,
            lastName: true,
            schoolId: true,
            email: true,
            isEmailVerified: true,
            isAlumni: true,
            updatedAt: true,
            isArchieved: true,
            course: {
                select: { name: true }
            }
        },
        where: {
            role: "USER"
        }
    });
    return users;
}

export async function GETALLUSERSBYSUPERADMIN(){
    const users = await prisma.user.findMany({
        select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            role: true
        }
    });
    return users;
}

export async function getUsersWithSameCourse(userId: string, courseId: string, category?: string) {
    const usersWithSameSkillAndCourse = await prisma.user.findMany({
        where: {
            AND: [
                { id: { not: userId } },
                { courseId: courseId },
                { skill: {
                    some: {
                        skill: {
                            category: category
                        }
                    }
                } }
            ]
        },
        select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            image: true,
            course: true
        }
      });
      return usersWithSameSkillAndCourse;
  }
  
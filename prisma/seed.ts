import  { Permission, PrismaClient } from "@prisma/client"
import { default as bcrypt } from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  // Users
  const admin = await prisma.member.upsert({
    where: { email: "admin@admin.com"},
    update: {},
    create: {
      name: "Admin",
      email: "admin@admin.com",
      alias: "Admin",
      level: "NON_PLAYER",
      pronouns: "he/him",

      password: {
        create: {
          password: bcrypt.hashSync("admin", 10)
        }
      },
    }
  });
  await prisma.member.upsert({
    where: { email: "bcandeger@gamil.com"},
    update: {},
    create: {
      name: "Brittany Norton",
      email: "bcandeger@gamil.com",
      alias: "Link to the Fast",
      level: "GAME",
      preferredPosition: "JAMMER",
      number: "46",
      pronouns: "she/her",
      slackUsername: "brit",

      password: {
        create: {
          password: bcrypt.hashSync("brit", 10)
        }
      }
    }
  });
  await prisma.member.upsert({
    where: { email: "f@f.com"},
    update: {},
    create: {
      name: "Melissa",
      email: "f@f.com",
      alias: "FearLiss",
      level: "GAME",
      preferredPosition: "BLOCKER",
      number: "36",

      password: {
        create: {
          password: bcrypt.hashSync("fear", 10)
        }
      }
    }
  });
  await prisma.member.upsert({
    where: { email: "c@c.com"},
    update: {},
    create: {
      name: "Fake",
      email: "c@c.com",
      alias: "Blahhhh",
      level: "ROOKIE",
      preferredPosition: "PIVOT",
      number: "9999",

      password: {
        create: {
          password: bcrypt.hashSync("blah", 10)
        }
      }
    }
  });

  // Groups
  const groupAdminPerms = [
    Permission.ATTENDANCE_MANAGE,
    Permission.ASSESSMENT_MANAGE,
    Permission.EVENT_MANAGE,
    Permission.GROUP_MANAGE,
    Permission.MEMBER_MANAGE,
    Permission.SETTING_MANAGE,
    Permission.STATS_MANAGE,
    Permission.TEAM_MANAGE,
  ];
  const groupAdmin = await prisma.group.upsert({
    where: { name: "Admin" },
    update: {
      permissions: groupAdminPerms,
    },
    create: {
      name: "Admin",
      description: "Site admins group. Has every permission.",
      permissions: groupAdminPerms,
    }
  });
  const groupMemberPerms = [
    Permission.ATTENDANCE_READ,
    Permission.EVENT_READ,
    Permission.MEMBER_READ,
    Permission.STATS_READ,
    Permission.TEAM_READ
  ];
  const groupMember = await prisma.group.upsert({
    where: { name: "Member" },
    update: {
      permissions: groupMemberPerms,
    },
    create: {
      name: "Member",
      description: "General members, can view most things.",
      permissions: groupMemberPerms,
    }
  });

  // User Permissions
  await prisma.memberGroup.upsert({
    where: { memberId_groupId: { memberId: admin.id, groupId: groupAdmin.id } },
    update: {},
    create: {
      memberId: admin.id,
      groupId: groupAdmin.id,
    }
  });
  await prisma.memberGroup.upsert({
    where: { memberId_groupId: { memberId: admin.id, groupId: groupMember.id } },
    update: {},
    create: {
      memberId: admin.id,
      groupId: groupMember.id,
    }
  });
};

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  });
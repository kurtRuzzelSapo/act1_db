import { PrismaClient } from '@prisma/client';
import { log } from 'console';

const prisma = new PrismaClient();

async function main() {
    
    const createAccount = await prisma.account.create({
        data: {
            email: 'test@gmail.com',
            username: 'Luna',
            password: 'hashedpassword', 
        }
    });
    console.log("Account Created, Welcome! :", createAccount);

    
    const addModule = await prisma.module.create({
        data: {
            accountCode: createAccount.id,  
            moduleCode: 'R101',
            moduleDetails: 'React Module',
            moduleDesc: 'React Advance Module'
        }
    });
    console.log("Module Added", addModule);

 
    const getAccounts = await prisma.account.findMany({
        include: {
            profile: true, 
            modules: true  
        }
    });
    console.dir(getAccounts, { depth: null });
}


main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });

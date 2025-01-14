# GymPass Style App

## Functional Requirements (FR)
- Users must be able to register.  
- Users must be able to authenticate.  
- Users must be able to retrieve their logged-in profile.  
- Users must be able to get the number of check-ins they have made.  
- Users must be able to view their check-in history.  
- Users must be able to search for nearby gyms.  
- Users must be able to search for gyms by name.  
- Users must be able to check in at a gym.  
- It must be possible to validate a user's check-in.  
- Admins must be able to register new gyms.  

## Business Rules (BR)
- Users cannot register with duplicate email addresses.  
- Users cannot perform more than one check-in per day at the same gym.  
- Users cannot check in unless they are within 100 meters of the gym.  
- Check-ins can only be validated within 20 minutes of creation.  
- Only administrators can validate check-ins.  
- Only administrators can register new gyms.  

## Non-Functional Requirements (NFR)
- User passwords must be encrypted.  
- Application data must be persisted in a PostgreSQL database.  
- All data lists must be paginated with 20 items per page.  
- Users must be identified using JWT.  


## 🚀 Technologies Used
* **[Docker](https://www.docker.com/)**  
* **[Vitest](https://vitest.dev/)**  
* **[Typescript](https://www.typescriptlang.org/)**  
* **[Prisma](https://www.prisma.io/)**  
* **[Fastify](https://www.fastify.io/)**  

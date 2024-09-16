// src/admin/admin.controller.ts

import { 
    Body, Controller, Get, Param, Post, Put, Delete, Query, ValidationPipe, 
    UsePipes, Patch, UseInterceptors, UploadedFile, Res, UseGuards 
  } from '@nestjs/common'; // Import necessary decorators and classes from NestJS
  import { AdminService } from './admin.service';
  import { AdminDTO, AdminUpdateDTO, LoginDTO } from './admin.dto';
  import { FileInterceptor } from '@nestjs/platform-express'; // Import FileInterceptor for file handling
  import { diskStorage } from 'multer'; // Import diskStorage for file storage configuration
  import { JwtAuthGuard } from '../auth/jwt-auth.guard'; 
  import { CreateEventDTO, UpdateEventDTO } from '../events/event.dto'; 
  import { EventService } from '../events/event.service';
  import { VolunteerService } from '../volunteers/volunteer.service'; 
  import { CreateVolunteerDTO, UpdateVolunteerDTO } from '../volunteers/volunteer.dto'; 
  import { EventManagerService } from 'src/event-manager/event-manager.service'; 
  import { CreateEventManagerDTO, UpdateEventManagerDTO } from 'src/event-manager/event-manager.dto'; 
  import { SponsorService } from 'src/sponsors/sponsor.service'; 
  import { CreateSponsorDTO, UpdateSponsorDTO } from 'src/sponsors/sponsor.dto'; 
  
  @Controller('admin') // Define the controller and set the base route to 'admin'
  export class AdminController {
    constructor(
      private readonly adminService: AdminService, // Inject AdminService
      private readonly eventService: EventService, // Inject EventService
      private readonly volunteerService: VolunteerService, // Inject VolunteerService
      private readonly eventManagerService: EventManagerService, // Inject EventManagerService
      private readonly sponsorService: SponsorService, // Inject SponsorService
    ) {}
  
      // Admin-related endpoints
  
      @Post('signup') // Define the POST route for admin signup
      @UsePipes(new ValidationPipe()) // Use validation pipe for request validation
      signUp(@Body() adminDTO: AdminDTO): Promise<object> { // Handle signup request
          return this.adminService.signUp(adminDTO); // Call signUp method of AdminService
      }
  
      @Post('login') // Define the POST route for admin login
      @UsePipes(new ValidationPipe()) // Use validation pipe for request validation
      login(@Body() loginDto: LoginDTO): Promise<{ accessToken: string }> { // Handle login request
          return this.adminService.login(loginDto); // Call login method of AdminService
      }
  
      @Get() // Define the GET route to retrieve admin details
      getAdmin(): Promise<object> { // Handle request to get admin
          return this.adminService.getAdmin(); // Call getAdmin method of AdminService
      }
  
      @UseGuards(JwtAuthGuard) // Protect route with JWT guard
      @Get('getById/:id') // Define the GET route to retrieve admin by ID
      getAdminById(@Param('id') id: number): Promise<object> { // Handle request to get admin by ID
          return this.adminService.getAdminById(id); // Call getAdminById method of AdminService
      }
  
      @Get('getByNameAndId') // Define the GET route to retrieve admin by name and ID
      getAdminByNameAndId(@Query('name') name: string, @Query('id') id: number): Promise<object> { // Handle request to get admin by name and ID
          return this.adminService.getAdminByName(name, id); // Call getAdminByName method of AdminService
      }
  
      @Get('getAll') // Define the GET route to retrieve all admins
      getAllAdmins(): Promise<object> { // Handle request to get all admins
          return this.adminService.getAllAdmins(); // Call getAllAdmins method of AdminService
      }
  
      @Post('add') // Define the POST route to add a new admin
      @UsePipes(new ValidationPipe()) // Use validation pipe for request validation
      addAdmin(@Body() adminDTO: AdminDTO): Promise<object> { // Handle request to add admin
          return this.adminService.addAdmin(adminDTO); // Call addAdmin method of AdminService
      }
  
      @UseGuards(JwtAuthGuard) // Protect route with JWT guard
      @Put('update/:id') // Define the PUT route to update admin details
      @UsePipes(new ValidationPipe()) // Use validation pipe for request validation
      updateAdmin(@Param('id') id: number, @Body() adminUpdateDTO: AdminUpdateDTO): Promise<object> { // Handle request to update admin
          return this.adminService.updateAdmin(id, adminUpdateDTO); // Call updateAdmin method of AdminService
      }
  
      @UseGuards(JwtAuthGuard) // Protect route with JWT guard
      @Patch('updateInfo/:id') // Define the PATCH route to update partial admin info
      @UsePipes(new ValidationPipe()) // Use validation pipe for request validation
      updateAdminInfo(@Param('id') id: number, @Body() adminUpdateDTO: AdminUpdateDTO): Promise<object> { // Handle request to update admin info
          return this.adminService.updateAdminInfo(id, adminUpdateDTO); // Call updateAdminInfo method of AdminService
      }
  
      @UseGuards(JwtAuthGuard) // Protect route with JWT guard
      @Delete('delete/:id') // Define the DELETE route to delete an admin
      deleteAdmin(@Param('id') id: number): Promise<object> { // Handle request to delete admin
          return this.adminService.deleteAdmin(id); // Call deleteAdmin method of AdminService
      }
  
      @Post('uploadImage') // Define the POST route for image upload
      @UseInterceptors(FileInterceptor('myfile', { // Use FileInterceptor for file upload handling
          fileFilter: (req, file, cb) => { // Filter files based on their type
              if (file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) { // Allow specific file types
                  cb(null, true); // Accept file
              } else {
                  cb(new Error('Unsupported file type'), false); // Reject file with error
              }
          },
          limits: { fileSize: 2 * 1024 * 1024 }, // Set file size limit (2MB)
          storage: diskStorage({ // Configure storage options
              destination: './uploads', // Set the destination directory
              filename: (req, file, cb) => { // Generate a unique filename
                  cb(null, Date.now() + '-' + file.originalname); // Use timestamp and original name
              },
          }),
      }))
      uploadImage(@UploadedFile() file: Express.Multer.File): string { // Handle file upload
          if (!file) { // Check if file is not present
              throw new Error('File upload failed'); // Throw an error if file upload fails
          }
          return file.filename; // Return filename to save in database or use later
      }
  
      @Get('getImage/:name') // Define the GET route to retrieve an uploaded image
      getImage(@Param('name') filename: string, @Res() res): void { // Handle request to get image
          res.sendFile(filename, { root: './uploads' }); // Send the file as a response
      }
  
      @Post('sendemail') // Define the POST route to send an email
      async sendEmail(@Body() mydata: { email: string; subject: string; text: string }): Promise<object> { // Handle request to send email
      try {
        await this.adminService.sendEmail(mydata); // Call sendEmail method of AdminService
        return { message: 'Email sent successfully' }; // Return success message
      } catch (error) {
        return { message: 'Failed to send email', error: error.message }; // Return error message if sending email fails
      }
    }
  
      // Event-related endpoints
  
      @UseGuards(JwtAuthGuard) // Protect route with JWT guard
      @Post('createEvent') // Define the POST route to create an event
      @UsePipes(new ValidationPipe()) // Use validation pipe for request validation
      createEvent(@Body() createEventDTO: CreateEventDTO): Promise<object> { // Handle request to create event
          return this.eventService.createEvent(createEventDTO); // Call createEvent method of EventService
      }
  
      @UseGuards(JwtAuthGuard) // Protect route with JWT guard
      @Put('updateEvent/:id') // Define the PUT route to update an event
      @UsePipes(new ValidationPipe()) // Use validation pipe for request validation
      updateEvent(@Param('id') id: number, @Body() updateEventDTO: UpdateEventDTO): Promise<object> { // Handle request to update event
          return this.eventService.updateEvent(id, updateEventDTO); // Call updateEvent method of EventService
      }
  
      @UseGuards(JwtAuthGuard) // Protect route with JWT guard
      @Delete('deleteEvent/:id') // Define the DELETE route to delete an event
      deleteEvent(@Param('id') id: number): Promise<object> {  // Handle request to delete event
          return this.eventService.deleteEvent(id); // Call deleteEvent method of EventService
      }
  
      @UseGuards(JwtAuthGuard) // Protect route with JWT guard
      @Get('viewEvent/:id') // Define the GET route to view an event by ID
      viewEvent(@Param('id') id: number): Promise<object> { // Handle request to view event
          return this.eventService.getEventById(id); // Call getEventById method of EventService
      }
  
      @UseGuards(JwtAuthGuard) // Protect route with JWT guard
      @Get('viewAllEvents') // Define the GET route to view all events
      viewAllEvents(): Promise<object> { // Handle request to view all events
          return this.eventService.getAllEvents(); // Call getAllEvents method of EventService
      }
  
      // Volunteer-related endpoints
  
      @UseGuards(JwtAuthGuard) // Protect route with JWT guard
      @Post('createVolunteer') // Define the POST route to create a volunteer
      @UsePipes(new ValidationPipe()) // Use validation pipe for request validation
      createVolunteer(@Body() createVolunteerDTO: CreateVolunteerDTO): Promise<object> { // Handle request to create volunteer
          return this.volunteerService.createVolunteer(createVolunteerDTO); // Call createVolunteer method of VolunteerService
      }
  
      @UseGuards(JwtAuthGuard) // Protect route with JWT guard
      @Put('updateVolunteer/:id') // Define the PUT route to update a volunteer
      @UsePipes(new ValidationPipe()) // Use validation pipe for request validation
      updateVolunteer(@Param('id') id: number, @Body() updateVolunteerDTO: UpdateVolunteerDTO): Promise<object> { // Handle request to update volunteer
          return this.volunteerService.updateVolunteer(id, updateVolunteerDTO); // Call updateVolunteer method of VolunteerService
      }
  
      @UseGuards(JwtAuthGuard) // Protect route with JWT guard
      @Delete('deleteVolunteer/:id') // Define the DELETE route to delete a volunteer
      deleteVolunteer(@Param('id') id: number): Promise<object> { // Handle request to delete volunteer
          return this.volunteerService.removeVolunteer(id); // Call removeVolunteer method of VolunteerService
      }
  
      @UseGuards(JwtAuthGuard) // Protect route with JWT guard
      @Get('viewVolunteer/:id') // Define the GET route to view a volunteer by ID
      viewVolunteer(@Param('id') id: number): Promise<object> { // Handle request to view volunteer
          return this.volunteerService.getVolunteerById(id); // Call getVolunteerById method of VolunteerService
      }
  
      @UseGuards(JwtAuthGuard) // Protect route with JWT guard
      @Get('viewAllVolunteers') // Define the GET route to view all volunteers
      viewAllVolunteers(): Promise<object> { // Handle request to view all volunteers
          return this.volunteerService.getAllVolunteers(); // Call getAllVolunteers method of VolunteerService
      }
  
      // Event Manager-related endpoints
  
      @UseGuards(JwtAuthGuard) // Protect route with JWT guard
      @Post('createEventManager') // Define the POST route to create an event manager
      @UsePipes(new ValidationPipe()) // Use validation pipe for request validation
      createEventManager(@Body() createEventManagerDTO: CreateEventManagerDTO): Promise<object> { // Handle request to create event manager
          return this.eventManagerService.createEventManager(createEventManagerDTO); // Call createEventManager method of EventManagerService
      }
  
      @UseGuards(JwtAuthGuard) // Protect route with JWT guard
      @Put('updateEventManager/:id') // Define the PUT route to update an event manager
      @UsePipes(new ValidationPipe()) // Use validation pipe for request validation
      updateEventManager(@Param('id') id: number, @Body() updateEventManagerDTO: UpdateEventManagerDTO): Promise<object> { // Handle request to update event manager
          return this.eventManagerService.updateEventManager(id, updateEventManagerDTO); // Call updateEventManager method of EventManagerService
      }
  
      @UseGuards(JwtAuthGuard) // Protect route with JWT guard
      @Delete('deleteEventManager/:id') // Define the DELETE route to delete an event manager
      deleteEventManager(@Param('id') id: number): Promise<object> { // Handle request to delete event manager
          return this.eventManagerService.removeEventManager(id); // Call removeEventManager method of EventManagerService
      }
  
      @UseGuards(JwtAuthGuard) // Protect route with JWT guard
      @Get('viewEventManager/:id') // Define the GET route to view an event manager by ID
      viewEventManager(@Param('id') id: number): Promise<object> { // Handle request to view event manager
          return this.eventManagerService.getEventManagerById(id); // Call getEventManagerById method of EventManagerService
      }
  
      @UseGuards(JwtAuthGuard) // Protect route with JWT guard
      @Get('viewAllEventManagers') // Define the GET route to view all event managers
      viewAllEventManagers(): Promise<object> { // Handle request to view all event managers
          return this.eventManagerService.getAllEventManagers(); // Call getAllEventManagers method of EventManagerService
      }
  
      // Sponsor-related endpoints
  
      @UseGuards(JwtAuthGuard) // Protect route with JWT guard
      @Post('createSponsor') // Define the POST route to create a sponsor
      @UsePipes(new ValidationPipe()) // Use validation pipe for request validation
      createSponsor(@Body() createSponsorDTO: CreateSponsorDTO): Promise<object> { // Handle request to create sponsor
          return this.sponsorService.createSponsor(createSponsorDTO); // Call createSponsor method of SponsorService
      }
  
      @UseGuards(JwtAuthGuard) // Protect route with JWT guard
      @Put('updateSponsor/:id') // Define the PUT route to update a sponsor
      @UsePipes(new ValidationPipe()) // Use validation pipe for request validation
      updateSponsor(@Param('id') id: number, @Body() updateSponsorDTO: UpdateSponsorDTO): Promise<object> { // Handle request to update sponsor
          return this.sponsorService.updateSponsor(id, updateSponsorDTO); // Call updateSponsor method of SponsorService
      }
  
      @UseGuards(JwtAuthGuard) // Protect route with JWT guard
      @Delete('deleteSponsor/:id') // Define the DELETE route to delete a sponsor
      deleteSponsor(@Param('id') id: number): Promise<object> { // Handle request to delete sponsor
          return this.sponsorService.removeSponsor(id); // Call removeSponsor method of SponsorService
      }
  
      @UseGuards(JwtAuthGuard) // Protect route with JWT guard
      @Get('viewSponsor/:id') // Define the GET route to view a sponsor by ID
      viewSponsor(@Param('id') id: number): Promise<object> { // Handle request to view sponsor
          return this.sponsorService.getSponsorById(id); // Call getSponsorById method of SponsorService
      }
  
      @UseGuards(JwtAuthGuard) // Protect route with JWT guard
      @Get('viewAllSponsors') // Define the GET route to view all sponsors
      viewAllSponsors(): Promise<object> { // Handle request to view all sponsors
          return this.sponsorService.getAllSponsors(); // Call getAllSponsors method of SponsorService
      }
  }
  
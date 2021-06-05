USE [BayMax]
GO
/****** Object:  Table [dbo].[emptbl]    Script Date: 05-06-2021 10:52:16 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[emptbl](
	[ID] [int] IDENTITY(1001,1) NOT NULL,
	[Firstname] [nvarchar](50) NULL,
	[Lastname] [nvarchar](50) NULL,
	[Designation] [nvarchar](50) NULL,
	[Department] [nvarchar](50) NULL,
	[Password] [varbinary](max) NULL,
	[Last Updated] [datetime] NULL,
	[Status] [int] NULL,
	[Role] [int] NULL,
	[Salt] [uniqueidentifier] NULL,
PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO

/****** Object:  Table [dbo].[performanceTbl]    Script Date: 05-06-2021 10:52:17 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[performanceTbl](
	[ReviewerID] [int] NULL,
	[ID] [int] NOT NULL,
	[Communication] [int] NULL,
	[Project Delivery] [int] NULL,
	[Self Initiative] [int] NULL,
	[TAT] [int] NULL,
	[Month] [nvarchar](30) NOT NULL,
	[Year] [nvarchar](50) NOT NULL,
	[Status] [int] NULL,
	[Last Updated] [datetime] NULL,
PRIMARY KEY CLUSTERED 
(
	[ID] ASC,
	[Month] ASC,
	[Year] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

/****** Object:  StoredProcedure [dbo].[sp_Emp]    Script Date: 05-06-2021 10:52:17 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[sp_Emp]
@role int=null,
@id int=null,
@reviewerID int=null,
@firstName varchar(255)=null,
@lastName varchar(255)=null,
@department varchar(255)=null,
@designation varchar(255)=null,
@password varchar(255)=null,
@status int=null,
@month nvarchar(30)=null,
@year nvarchar(30)=null,
@communication int=null,
@projectDelivery int=null,	
@selfInitiative int=null,
@tat int=null,
@flag varchar(255)=null
AS
BEGIN
if (@flag='get')
	BEGIN
	SELECT ID,Firstname,Lastname,Department,Designation,[Last Updated]
 FROM emptbl where isnull(status,0)!=0 and role!=1 order by [Last Updated] desc
	END
if (@flag='login')
	BEGIN
	SELECT * FROM emptbl 
	WHERE id=@id and Password=HASHBYTES('SHA2_512', @password+CAST(Salt AS NVARCHAR(36))) 
	END
if (@flag='getEmp')
	BEGIN
	SELECT FirstName,LastName,Designation,Department,Role
	FROM emptbl 
	WHERE id=@id and isnull(status,0)!=0 and role !=1
	END
if (@flag='update')
	BEGIN
	update emptbl
	set FirstName=@firstName,LastName=@lastName,Department=@department,Designation=@designation,[last updated]=getdate()
	where id=@id and isnull(status,0)!=0  and role !=1
	END
	if (@flag='removeEmp')
	BEGIN
	update emptbl
	set status=0
	where id=@id
	END
	if (@flag='add')
	BEGIN
	DECLARE @salt UNIQUEIDENTIFIER=NEWID()
	DECLARE @s int=2
	Insert into emptbl values (@firstName, @lastName,@designation,@department,HASHBYTES('SHA2_512', N'123'+CAST(@salt AS NVARCHAR(36))),
	getdate(),@s,2,@salt)	
	END
	if (@flag='changePassword')
	BEGIN
	DECLARE @salt1 UNIQUEIDENTIFIER=NEWID()
	update emptbl
	set Password=HASHBYTES('SHA2_512', @password+CAST(@salt1 AS NVARCHAR(36))),Status=1,Salt=@salt1
	where id=@id ;
	SELECT * FROM emptbl 
	WHERE id=@id and Password=HASHBYTES('SHA2_512', @password+CAST(Salt AS NVARCHAR(36))) and role !=1;
	END
	if(@flag='empNameByDept')
	BEGIN
	set @month= MONTH(getdate())
	set @year= year(getdate())
	Select e.ID,e.Firstname,e.Designation,p.* from emptbl e
	left hash join
	(select * from performanceTbl)p
	on e.id=p.id
	and @month=p.Month
	and @year=p.Year
	where p.id is null and e.Role !=1
	and e.Department=@department
	order by 1
	END
	if(@flag='reviewRecords')
	BEGIN
	Select e.Firstname,e.Lastname,e.Department, p.* from performanceTbl p join emptbl e on e.id=p.id
	where e.status !=0
	END
	if(@flag='addReview')
	BEGIN	
	set @month= MONTH(getdate())
	set @year= year(getdate())
	--Select * from performanceTbl
	insert into performanceTbl values (@reviewerID,@id,@communication,@projectDelivery,@selfInitiative,@tat,@month,@year,@status,GETDATE())
	END
	if(@flag='getReview')
	BEGIN
	Select e.Firstname,e.Lastname,e.Department,e.Designation ,p.* from performanceTbl p join emptbl e on e.id=p.id
	where e.status !=0 and e.id=@id
	END
	if(@flag='updateReview')
	BEGIN
	set @month= MONTH(getdate())
	set @year= year(getdate())
	update performanceTbl 
	set Communication=@communication,[Project Delivery]=@projectDelivery,[Self Initiative]=@selfInitiative,tat=@tat,
	ReviewerID=@reviewerID, status=@status,
	month=@month,year=@year,[Last Updated]=GETDATE()
	where id=@id ;
	END
	if(@flag='pendingRecords')
	BEGIN
	Select e.Firstname,e.Lastname,e.Department, p.* from performanceTbl p join emptbl e on e.id=p.id
	where e.status !=0 and ReviewerID=@reviewerID and p.status=2
	END
	if(@flag='getPendingReview')
	BEGIN
	Select e.Firstname,e.Lastname,e.Department,e.Designation ,p.* from performanceTbl p join emptbl e on e.id=p.id
	where e.status !=0 and e.id=@id and ReviewerID=@reviewerID
	END
END

GO

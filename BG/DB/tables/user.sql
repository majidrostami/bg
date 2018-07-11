USE [bg]
GO
/****** Object:  Table [dbo].[USER]    Script Date: 05/12/2012 14:32:59 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

IF OBJECT_ID('dbo.USER', 'U') IS NOT NULL
  DROP TABLE dbo.[USER]

CREATE TABLE [dbo].[USER](
	[login_id] [nvarchar](100) NOT NULL,
	[first_name] [nvarchar](100) NOT NULL,
	[last_name] [nvarchar](100) NOT NULL,
	[gender] [bit] NOT NULL,
	[dob] [datetime] NULL,
	[doj] [datetime] NOT NULL,
	[status] [nvarchar](10) NOT NULL,
 CONSTRAINT [USER_PrimaryKey] PRIMARY KEY CLUSTERED 
(
	[login_id] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]

GO

ALTER TABLE [dbo].[USER]  WITH CHECK ADD  CONSTRAINT [FK_USER_login] FOREIGN KEY([login_id])
REFERENCES [dbo].[LOGIN] ([login_id])
GO

ALTER TABLE [dbo].[USER] CHECK CONSTRAINT [FK_USER_login]
GO

USE [bg]
GO

/****** Object:  Table [dbo].[LOGIN]    Script Date: 05/12/2012 14:32:22 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO
IF OBJECT_ID('dbo.LOGIN', 'U') IS NOT NULL
  DROP TABLE dbo.[LOGIN]


CREATE TABLE [dbo].[LOGIN](
	[login_id] [nvarchar](100) NOT NULL,
	[password] [nvarchar](150) NOT NULL,
	[sid] [nvarchar](150) NOT NULL,
	[locked] [bit] NOT NULL,
	[role] [nvarchar](10) NOT NULL,
	[trys] [int] NOT NULL,
	[time_locked] [datetime] NULL,
 CONSTRAINT [LOGIN_PrimaryKey] PRIMARY KEY CLUSTERED 
(
	[login_id] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]

GO

ALTER TABLE [dbo].[LOGIN] ADD  CONSTRAINT [LOGINlockedDefault]  DEFAULT ((0)) FOR [locked]
GO

ALTER TABLE [dbo].[LOGIN] ADD  CONSTRAINT [LOGINtrysDefault]  DEFAULT ((0)) FOR [trys]
GO

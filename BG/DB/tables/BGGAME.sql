USE [bg]
GO

/****** Object:  Table [dbo].[BGGAME]    Script Date: 05/12/2012 14:32:22 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO
IF OBJECT_ID('dbo.BGGAME', 'U') IS NOT NULL
  DROP TABLE dbo.[BGGAME]


CREATE TABLE [dbo].[BGGAME](
	[bgGameID] [int] IDENTITY(1,1) NOT NULL,
	[player1] [nvarchar](100) NOT NULL,
	[player2] [nvarchar](100) NOT NULL,
	[winner] SMALLINT NOT NULL,
	[p1Doubles] [int] NOT NULL,
	[p2Doubles] [int] NOT NULL,
	[p1Pips] [int] NOT NULL,
	[p2Pips] [int] NOT NULL,
	[pipsAtEnd] [int] NOT NULL,
	[abondoned] [bit] NOT NULL,
	[startTime] [datetime] NULL,
	[endTime] [datetime] NULL,
	[nRolls] [int] NOT NULL,
 CONSTRAINT [bgGame_PrimaryKey] PRIMARY KEY CLUSTERED 
(
	[bgGameID] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]

GO

ALTER TABLE [dbo].[BGGAME]  WITH CHECK ADD  CONSTRAINT [FK_BGGAME_login1] FOREIGN KEY([player1])
REFERENCES [dbo].[LOGIN] ([login_id])
GO

ALTER TABLE [dbo].[BGGAME] CHECK CONSTRAINT [FK_BGGAME_login1]
GO

ALTER TABLE [dbo].[BGGAME]  WITH CHECK ADD  CONSTRAINT [FK_BGGAME_login2] FOREIGN KEY([player2])
REFERENCES [dbo].[LOGIN] ([login_id])
GO

ALTER TABLE [dbo].[BGGAME] CHECK CONSTRAINT [FK_BGGAME_login2]
GO



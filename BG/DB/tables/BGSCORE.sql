/****** Object:  Table [dbo].[BGSCORE]    Script Date: 05/12/2012 14:29:31 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

IF OBJECT_ID('dbo.BGSCORE', 'U') IS NOT NULL
  DROP TABLE dbo.[BGSCORE]



CREATE TABLE [dbo].[BGSCORE](
	[login_id] [nvarchar](100) NOT NULL,
	[games_played] [int] NOT NULL,
	[games_won] [int] NOT NULL,
	[games_gammoned] [int] NOT NULL,
	[games_backgammoned] [int] NOT NULL,
	[games_abondoned] [int] NOT NULL,
	[high_score_games] [int] NOT NULL,
	[low_score_games] [int] NOT NULL,
	[score] [int] NOT NULL,
 CONSTRAINT [BGSCORE_PrimaryKey] PRIMARY KEY CLUSTERED 
(
	[login_id] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]

GO

ALTER TABLE [dbo].[BGSCORE] ADD  CONSTRAINT [BGSCOREgames_playedDefault]  DEFAULT ((0)) FOR [games_played]
GO

ALTER TABLE [dbo].[BGSCORE] ADD  CONSTRAINT [BGSCOREgames_wonDefault]  DEFAULT ((0)) FOR [games_won]
GO

ALTER TABLE [dbo].[BGSCORE] ADD  CONSTRAINT [BGSCOREgames_gammonedDefault]  DEFAULT ((0)) FOR [games_gammoned]
GO

ALTER TABLE [dbo].[BGSCORE] ADD  CONSTRAINT [BGSCOREgames_backgammonedDefault]  DEFAULT ((0)) FOR [games_backgammoned]
GO

ALTER TABLE [dbo].[BGSCORE] ADD  CONSTRAINT [BGSCOREgames_abondonedDefault]  DEFAULT ((0)) FOR [games_abondoned]
GO

ALTER TABLE [dbo].[BGSCORE] ADD  CONSTRAINT [BGSCOREhigh_score_gamesDefault]  DEFAULT ((0)) FOR [high_score_games]
GO

ALTER TABLE [dbo].[BGSCORE] ADD  CONSTRAINT [BGSCORElow_score_gamesDefault]  DEFAULT ((0)) FOR [low_score_games]
GO

ALTER TABLE [dbo].[BGSCORE] ADD  CONSTRAINT [BGSCOREscoreDefault]  DEFAULT ((0)) FOR [score]
GO


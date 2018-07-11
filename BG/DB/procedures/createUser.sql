
IF EXISTS (SELECT * FROM sys.objects WHERE type = 'P' AND name = 'createUser')
	DROP PROCEDURE dbo.[createUser] 

SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE dbo.[createUser] 
	-- Add the parameters for the stored procedure here
	@login_id nvarchar(100),
	@password nvarchar(150),
	@sid nvarchar(150),
	@first_name nvarchar(100),
	@last_name nvarchar(100),
	@gender bit,
	@dob datetime,
	@doj datetime
	
	
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;
	BEGIN TRAN
		DECLARE @intErrorCode INT

		insert into dbo.LOGIN(login_id,password,sid,locked,role,trys,time_locked)
			values (@login_id, @password,@sid,0,'user',0,null)

		insert into dbo.[USER](login_id, first_name,last_name,gender,dob,doj,status)
			values(@login_id,@first_name,@last_name,@gender,@dob,@doj,'active')

		insert into dbo.BGSCORE(login_id,games_played,games_won,games_gammoned,games_backgammoned,games_abondoned,high_score_games,low_score_games,score)
			values (@login_id,0,0,0,0,0,0,0,1000)
	
		SELECT @intErrorCode = @@ERROR
		IF (@intErrorCode <> 0) GOTO PROBLEM

	COMMIT TRAN
	PROBLEM:
	IF (@intErrorCode <> 0) BEGIN
	PRINT 'Unexpected error occurred!'
		ROLLBACK TRAN
	/* SET NOCOUNT ON */
	END


END
GO

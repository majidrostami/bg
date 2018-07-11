
IF EXISTS (SELECT * FROM sys.objects WHERE type = 'P' AND name = 'insertGameRecord')
	DROP PROCEDURE dbo.[insertGameRecord] 

SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE  dbo.insertGameRecord
	(
		@player1 nvarchar(100),
		@player2 nvarchar(100),
		@winner smallint,
		@abondoned bit,
		@p1Doubles int,
		@p2Doubles int,
		@p1Pips int,
		@p2Pips int,
		@pipsAtEnd int,
		@startTime datetime,
		@endTime datetime,
		@nRolls int 
	)	
AS
BEGIN
	DECLARE @intErrorCode INT
	BEGIN TRAN
	
	INSERT INTO BGGAME(player1,player2,winner,abondoned,p1Doubles,p2Doubles,p1Pips, p2Pips, pipsAtEnd, startTime,endTime, nRolls)
	VALUES(@player1, @player2, @winner,@abondoned,@p1Doubles,@p2Doubles,@p1Pips, @p2Pips, @pipsAtEnd, @startTime, @endTime, @nRolls   )

	UPDATE BGSCORE SET games_played = (games_played + 1) where login_id = @player1
	UPDATE BGSCORE SET games_played = (games_played + 1) where login_id = @player2  
	
	IF @winner = 1
	BEGIN 
		UPDATE BGSCORE SET games_won = (games_won + 1) where login_id = @player1
	END
	IF @winner = 2
	BEGIN 
		UPDATE BGSCORE SET games_won = (games_won + 1) where login_id = @player2
	END
	
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


IF EXISTS (SELECT * FROM sys.objects WHERE type = 'P' AND name = 'getCredentilas')
	DROP PROCEDURE dbo.[getCredentilas] 

SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE  dbo.getCredentilas
	(
		@loginId nvarchar(100) 
	)	
AS
BEGIN
	SET NOCOUNT ON 
	select 
		 password
		,sid
		,locked,role
		,first_name
		,last_name
		,gender,dob
		,doj
		,status 
	FROM dbo.[LOGIN] l
		JOIN [dbo].[user] u  
	ON
		l.login_id = u.login_id

	WHERE 
		l.login_id = @loginId  

END
GO

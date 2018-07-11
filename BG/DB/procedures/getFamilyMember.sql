
IF EXISTS (SELECT * FROM sys.objects WHERE type = 'P' AND name = 'getFamilyMember')
	DROP PROCEDURE dbo.[getFamilyMember] 

SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE  dbo.getFamilyMember
	(
		@email nvarchar(150)
	)
	
AS
BEGIN
	/* SET NOCOUNT ON */
	SELECT email 
		FROM [FAMILY] 
	WHERE email = @email

END
